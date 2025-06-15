import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PatientTrackingMap from "@/components/PatientTrackingMap";
import FamiliarPeopleGallery from "@/components/FamiliarPeopleGallery";

const PatientDashboard = () => {
  const [currentLocation, setCurrentLocation] = useState<{lat: number, lng: number} | null>(null);
  const [isLocationSharing, setIsLocationSharing] = useState(false);

  useEffect(() => {
    // Get current location
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);

  const toggleLocationSharing = () => {
    setIsLocationSharing(!isLocationSharing);
    // TODO: Implement real-time location sharing with Socket.IO/Supabase
  };

  // Mock data - will be replaced with real data from Supabase
  const mockLocations = currentLocation ? [{
    id: "patient-1",
    latitude: currentLocation.lat,
    longitude: currentLocation.lng,
    name: "You",
    type: "patient" as const,
    lastUpdated: new Date().toISOString(),
  }] : [];

  const mockSafeZones = [
    {
      id: "home",
      latitude: 40.7128,
      longitude: -74.0060,
      radius: 200,
      name: "Home"
    },
    {
      id: "hospital",
      latitude: 40.7589,
      longitude: -73.9851,
      radius: 150,
      name: "Medical Center"
    }
  ];

  return (
    <div className="min-h-screen bg-gentle p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gentle-foreground">Patient Dashboard</h1>
            <p className="text-muted-foreground">Stay connected and safe</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant={isLocationSharing ? "default" : "secondary"} className="bg-warm">
              {isLocationSharing ? "Location Active" : "Location Inactive"}
            </Badge>
            <Button 
              onClick={toggleLocationSharing}
              variant={isLocationSharing ? "outline" : "default"}
              className={!isLocationSharing ? "bg-warm hover:bg-warm/90" : ""}
            >
              {isLocationSharing ? "Stop Sharing" : "Share Location"}
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Map Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-gentle-foreground">Your Location</CardTitle>
              <CardDescription>
                Your current location and safe zones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PatientTrackingMap 
                locations={mockLocations}
                safeZones={mockSafeZones}
                center={currentLocation ? [currentLocation.lat, currentLocation.lng] : [40.7128, -74.0060]}
              />
            </CardContent>
          </Card>

          {/* Familiar People Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-gentle-foreground">Familiar People</CardTitle>
              <CardDescription>
                People who care about you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FamiliarPeopleGallery />
            </CardContent>
          </Card>
        </div>

        {/* Status Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-gentle-foreground">Current Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-2xl font-bold text-warm mb-2">Safe</div>
                <p className="text-sm text-muted-foreground">You are in a safe zone</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-gentle-foreground">Guardians Nearby</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-2xl font-bold text-gentle-foreground mb-2">2</div>
                <p className="text-sm text-muted-foreground">Guardians in your area</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-gentle-foreground">Emergency Contact</CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-destructive hover:bg-destructive/90">
                Emergency Help
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;