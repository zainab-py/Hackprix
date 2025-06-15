import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import PatientTrackingMap from "@/components/PatientTrackingMap";

const GuardianDashboard = () => {
  const [alerts, setAlerts] = useState<Array<{id: string, message: string, type: string, timestamp: string}>>([]);
  const [connectedPatients, setConnectedPatients] = useState(2);

  useEffect(() => {
    // Mock real-time alerts - will be replaced with Socket.IO/Supabase real-time
    const mockAlert = {
      id: "alert-1",
      message: "Patient John left safe zone 'Home'",
      type: "warning",
      timestamp: new Date().toISOString(),
    };
    
    // Simulate receiving an alert after 3 seconds
    setTimeout(() => {
      setAlerts([mockAlert]);
    }, 3000);
  }, []);

  // Mock data - will be replaced with real data from Supabase
  const mockLocations = [
    {
      id: "patient-1",
      latitude: 40.7128,
      longitude: -74.0060,
      name: "John (Patient)",
      type: "patient" as const,
      lastUpdated: new Date().toISOString(),
    },
    {
      id: "patient-2", 
      latitude: 40.7589,
      longitude: -73.9851,
      name: "Mary (Patient)",
      type: "patient" as const,
      lastUpdated: new Date().toISOString(),
    },
    {
      id: "guardian-1",
      latitude: 40.7505,
      longitude: -73.9934,
      name: "You (Guardian)",
      type: "guardian" as const,
      lastUpdated: new Date().toISOString(),
    }
  ];

  const mockSafeZones = [
    {
      id: "home-1",
      latitude: 40.7128,
      longitude: -74.0060,
      radius: 200,
      name: "John's Home"
    },
    {
      id: "home-2",
      latitude: 40.7589,
      longitude: -73.9851,
      radius: 200,
      name: "Mary's Home"
    },
    {
      id: "hospital",
      latitude: 40.7614,
      longitude: -73.9776,
      radius: 150,
      name: "Medical Center"
    }
  ];

  const dismissAlert = (alertId: string) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId));
  };

  return (
    <div className="min-h-screen bg-gentle p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gentle-foreground">Guardian Dashboard</h1>
            <p className="text-muted-foreground">Monitor and protect your patients</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge className="bg-warm">
              {connectedPatients} Patients Connected
            </Badge>
            <Button className="bg-warm hover:bg-warm/90">
              Add Patient
            </Button>
          </div>
        </div>

        {/* Alert Banner */}
        {alerts.length > 0 && (
          <Alert className="border-destructive bg-destructive/10">
            <AlertDescription className="text-destructive font-medium">
              ⚠️ {alerts.length} Active Alert(s) - Check map for details
            </AlertDescription>
          </Alert>
        )}

        {/* Real-time Map */}
        <Card>
          <CardHeader>
            <CardTitle className="text-gentle-foreground">Real-time Tracking</CardTitle>
            <CardDescription>
              Live locations of all patients and safe zones
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PatientTrackingMap 
              locations={mockLocations}
              safeZones={mockSafeZones}
              center={[40.7505, -73.9934]}
            />
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Active Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="text-gentle-foreground">Active Alerts</CardTitle>
              <CardDescription>Recent security notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {alerts.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No active alerts
                </p>
              ) : (
                alerts.map((alert) => (
                  <div key={alert.id} className="p-3 border rounded-lg bg-warm/10 border-warm/20">
                    <p className="text-sm font-medium text-gentle-foreground">{alert.message}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-muted-foreground">
                        {new Date(alert.timestamp).toLocaleTimeString()}
                      </span>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => dismissAlert(alert.id)}
                      >
                        Dismiss
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Patient Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-gentle-foreground">Patient Status</CardTitle>
              <CardDescription>Current safety status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <p className="font-medium text-gentle-foreground">John</p>
                  <p className="text-sm text-muted-foreground">Patient</p>
                </div>
                <Badge variant="secondary" className="bg-warm text-warm-foreground">
                  Safe
                </Badge>
              </div>
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <p className="font-medium text-gentle-foreground">Mary</p>
                  <p className="text-sm text-muted-foreground">Patient</p>
                </div>
                <Badge variant="secondary" className="bg-warm text-warm-foreground">
                  Safe
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-gentle-foreground">Quick Actions</CardTitle>
              <CardDescription>Emergency and management tools</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-destructive hover:bg-destructive/90">
                Emergency Alert
              </Button>
              <Button variant="outline" className="w-full">
                Call Patient
              </Button>
              <Button variant="outline" className="w-full">
                Navigate to Patient
              </Button>
              <Button variant="outline" className="w-full">
                Manage Safe Zones
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GuardianDashboard;