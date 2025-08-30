import React from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const Newsletter = () => {
  return (
    < section className="mt-20" >
      <div className="hero-gradient p-10 md:p-16 text-center shadow-lg">
        <h2 className="text-3xl font-bold mb-4 text-primary">Stay Updated</h2>
        <p className="mb-8 max-w-lg mx-auto text-muted-foreground text-lg">
          Subscribe to our newsletter for the latest beauty tips and exclusive content
        </p>
        <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            className="bg-white/90 backdrop-blur-sm border-white/30 focus:ring-2 focus:ring-primary"
            required
          />
          <Button type="submit" size="lg" className="sm:w-auto w-full">
            Subscribe
          </Button>
        </form>
      </div>
    </section >
  );
};

export default Newsletter;