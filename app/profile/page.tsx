"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { User, Package, Settings, LogOut, Edit } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

interface StoredOrder {
  id: string
  total: number
  status: string
  orderDate: string
  items: Array<{ quantity?: number; title?: string; price?: number }>
}

interface DisplayOrder {
  id: string
  date: string
  total: number
  status: string
  items: number
}

const demoOrders: DisplayOrder[] = [
  { id: "ORD-001", date: "2025-01-15", total: 89.99, status: "Delivered", items: 3 },
  { id: "ORD-002", date: "2025-01-10", total: 156.5, status: "Shipped", items: 5 },
  { id: "ORD-003", date: "2025-01-05", total: 45.0, status: "Processing", items: 2 },
]

function statusVariant(status: string): "default" | "secondary" | "outline" | "destructive" {
  const s = status.toLowerCase()
  if (s === "delivered") return "default"
  if (s === "shipped") return "secondary"
  if (s === "cancelled" || s === "canceled") return "destructive"
  return "outline"
}

function titleCase(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export default function ProfilePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialTab = searchParams.get("tab") === "orders" ? "orders" :
                     searchParams.get("tab") === "settings" ? "settings" : "profile"

  const [isEditing, setIsEditing] = useState(false)
  const [userInfo, setUserInfo] = useState({
    firstName: "Jane",
    lastName: "Doe",
    email: "jane.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Beauty Street, New York, NY 10001",
  })
  const [orders, setOrders] = useState<DisplayOrder[]>(demoOrders)

  useEffect(() => {
    const raw = localStorage.getItem("orders")
    if (!raw) return
    try {
      const stored: StoredOrder[] = JSON.parse(raw)
      const mapped: DisplayOrder[] = stored.map((o) => ({
        id: o.id,
        date: o.orderDate,
        total: o.total,
        status: titleCase(o.status),
        items: o.items.reduce((sum, it) => sum + (it.quantity ?? 1), 0),
      }))
      setOrders([...mapped, ...demoOrders])
    } catch {
      // ignore corrupt localStorage
    }
  }, [])

  const handleSignOut = () => {
    document.cookie = "auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    toast("Signed out")
    router.push("/")
  }

  const handleSaveProfile = () => {
    setIsEditing(false)
    toast.success("Profile updated")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <div className="hero-gradient py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="container mx-auto px-4"
        >
          <div className="flex items-center space-x-4">
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white/20 backdrop-blur-sm rounded-full p-4"
            >
              <User className="h-12 w-12 text-primary" />
            </motion.div>
            <div>
              <h1 className="text-4xl font-bold text-primary">Welcome back, {userInfo.firstName}!</h1>
              <p className="text-muted-foreground text-lg">Manage your account and track your orders</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue={initialTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center space-x-2">
              <Package className="h-4 w-4" />
              <span>Orders</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="bg-white/80 backdrop-blur-sm border-border/50">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-primary">Personal Information</CardTitle>
                <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                  <Edit className="h-4 w-4 mr-2" />
                  {isEditing ? "Cancel" : "Edit"}
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name</label>
                    <Input
                      value={userInfo.firstName}
                      disabled={!isEditing}
                      onChange={(e) => setUserInfo({ ...userInfo, firstName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name</label>
                    <Input
                      value={userInfo.lastName}
                      disabled={!isEditing}
                      onChange={(e) => setUserInfo({ ...userInfo, lastName: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email Address</label>
                  <Input
                    value={userInfo.email}
                    disabled={!isEditing}
                    onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <Input
                    value={userInfo.phone}
                    disabled={!isEditing}
                    onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Address</label>
                  <Input
                    value={userInfo.address}
                    disabled={!isEditing}
                    onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value })}
                  />
                </div>

                {isEditing && (
                  <div className="flex space-x-4">
                    <Button onClick={handleSaveProfile}>Save Changes</Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card className="bg-white/80 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="text-primary">Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <motion.div
                  initial="hidden"
                  animate="show"
                  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
                  className="space-y-4"
                >
                  {orders.map((order) => (
                    <motion.div
                      key={order.id}
                      variants={{
                        hidden: { opacity: 0, x: -12 },
                        show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
                      }}
                      whileHover={{ x: 4 }}
                      className="flex items-center justify-between p-4 border border-border/50 rounded-lg"
                    >
                      <div>
                        <p className="font-semibold">{order.id}</p>
                        <p className="text-sm text-muted-foreground">
                          {order.date} • {order.items} item{order.items === 1 ? "" : "s"}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${order.total.toFixed(2)}</p>
                        <Badge variant={statusVariant(order.status)}>{order.status}</Badge>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="bg-white/80 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="text-primary">Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start bg-transparent" onClick={() => toast("Notification preferences saved")}>
                  <Settings className="h-4 w-4 mr-2" />
                  Notification Preferences
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" onClick={() => toast("Privacy settings updated")}>
                  <Settings className="h-4 w-4 mr-2" />
                  Privacy Settings
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" onClick={() => toast("Password reset email sent")}>
                  <Settings className="h-4 w-4 mr-2" />
                  Change Password
                </Button>
                <Button variant="destructive" className="w-full justify-start" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
