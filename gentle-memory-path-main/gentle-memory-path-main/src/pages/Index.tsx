import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated (will be implemented with Supabase)
    const isAuthenticated = false; // TODO: Check authentication status
    
    if (isAuthenticated) {
      // Redirect to appropriate dashboard based on user role
      // This will be implemented once Supabase authentication is set up
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gentle flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Hero Section */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gentle-foreground">
            Patient Tracking & Safety System
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real-time location monitoring, emergency alerts, and comprehensive care management 
            for dementia patients and their families.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 my-12">
          <Card className="border-warm/20">
            <CardHeader>
              <CardTitle className="text-gentle-foreground">For Patients</CardTitle>
              <CardDescription>
                Stay connected with loved ones and feel secure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-2 text-left">
                <li>• Location sharing with family</li>
                <li>• Familiar faces gallery</li>
                <li>• Emergency help button</li>
                <li>• Safe zone monitoring</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-warm/20">
            <CardHeader>
              <CardTitle className="text-gentle-foreground">For Guardians</CardTitle>
              <CardDescription>
                Monitor and protect your loved ones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-2 text-left">
                <li>• Real-time location tracking</li>
                <li>• Geofencing alerts</li>
                <li>• Emergency notifications</li>
                <li>• Navigation assistance</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-warm/20">
            <CardHeader>
              <CardTitle className="text-gentle-foreground">For Doctors</CardTitle>
              <CardDescription>
                Comprehensive patient monitoring
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-2 text-left">
                <li>• Multi-patient overview</li>
                <li>• Emergency event tracking</li>
                <li>• Medical reports</li>
                <li>• Care coordination</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="space-y-4">
          <p className="text-lg text-gentle-foreground font-medium">
            Get started with your role-based dashboard
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate("/login")}
              className="bg-warm hover:bg-warm/90 px-8 py-3"
              size="lg"
            >
              Sign In
            </Button>
            <Button 
              onClick={() => navigate("/register")}
              variant="outline"
              className="px-8 py-3"
              size="lg"
            >
              Create Account
            </Button>
          </div>
        </div>

        {/* Demo Access */}
        <div className="border-t pt-8 space-y-4">
          <p className="text-sm text-muted-foreground">
            Explore demo dashboards (authentication required for full features):
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate("/patient-dashboard")}
            >
              Patient Dashboard
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate("/guardian-dashboard")}
            >
              Guardian Dashboard
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate("/doctor-dashboard")}
            >
              Doctor Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
