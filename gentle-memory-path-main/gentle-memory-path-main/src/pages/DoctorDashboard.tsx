import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PatientTrackingMap from "@/components/PatientTrackingMap";

const DoctorDashboard = () => {
  // Mock data - will be replaced with real data from Supabase
  const mockLocations = [
    {
      id: "patient-1",
      latitude: 40.7128,
      longitude: -74.0060,
      name: "John Smith",
      type: "patient" as const,
      lastUpdated: new Date().toISOString(),
    },
    {
      id: "patient-2", 
      latitude: 40.7589,
      longitude: -73.9851,
      name: "Mary Johnson",
      type: "patient" as const,
      lastUpdated: new Date().toISOString(),
    },
    {
      id: "patient-3",
      latitude: 40.7505,
      longitude: -73.9934,
      name: "Robert Wilson",
      type: "patient" as const,
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
      id: "home-3",
      latitude: 40.7505,
      longitude: -73.9934,
      radius: 200,
      name: "Robert's Home"
    }
  ];

  const patients = [
    {
      id: "1",
      name: "John Smith",
      age: 72,
      diagnosis: "Early-stage Alzheimer's",
      lastCheckIn: "2 hours ago",
      status: "Safe",
      emergencyEvents: 2,
      guardians: ["Sarah Smith", "Michael Smith"]
    },
    {
      id: "2",
      name: "Mary Johnson",
      age: 68,
      diagnosis: "Mild Cognitive Impairment",
      lastCheckIn: "30 minutes ago",
      status: "Safe",
      emergencyEvents: 0,
      guardians: ["David Johnson"]
    },
    {
      id: "3",
      name: "Robert Wilson",
      age: 75,
      diagnosis: "Moderate Dementia",
      lastCheckIn: "1 hour ago",
      status: "Safe",
      emergencyEvents: 1,
      guardians: ["Linda Wilson", "James Wilson"]
    }
  ];

  return (
    <div className="min-h-screen bg-gentle p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gentle-foreground">Doctor Dashboard</h1>
            <p className="text-muted-foreground">Monitor all patients under your care</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge className="bg-warm">
              {patients.length} Active Patients
            </Badge>
            <Button className="bg-warm hover:bg-warm/90">
              Add New Patient
            </Button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-gentle-foreground">Total Patients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warm">{patients.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-gentle-foreground">Active Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">0</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-gentle-foreground">Safe Patients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warm">{patients.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-gentle-foreground">Emergency Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gentle-foreground">
                {patients.reduce((sum, p) => sum + p.emergencyEvents, 0)}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="map">Live Map</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Patient List */}
            <Card>
              <CardHeader>
                <CardTitle className="text-gentle-foreground">Patient Overview</CardTitle>
                <CardDescription>Current status of all patients</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patients.map((patient) => (
                    <div key={patient.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gentle-foreground">{patient.name}</h3>
                          <p className="text-sm text-muted-foreground">Age: {patient.age} | {patient.diagnosis}</p>
                        </div>
                        <Badge className="bg-warm text-warm-foreground">
                          {patient.status}
                        </Badge>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Last Check-in:</span>
                          <p className="text-muted-foreground">{patient.lastCheckIn}</p>
                        </div>
                        <div>
                          <span className="font-medium">Emergency Events:</span>
                          <p className="text-muted-foreground">{patient.emergencyEvents}</p>
                        </div>
                        <div>
                          <span className="font-medium">Guardians:</span>
                          <p className="text-muted-foreground">{patient.guardians.join(", ")}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">View Details</Button>
                        <Button size="sm" variant="outline">Contact Guardian</Button>
                        <Button size="sm" variant="outline">Emergency Protocol</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="map" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-gentle-foreground">Live Patient Tracking</CardTitle>
                <CardDescription>Real-time locations of all patients</CardDescription>
              </CardHeader>
              <CardContent>
                <PatientTrackingMap 
                  locations={mockLocations}
                  safeZones={mockSafeZones}
                  center={[40.7404, -73.9899]}
                  zoom={12}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-gentle-foreground">Medical Reports</CardTitle>
                <CardDescription>Patient history and analytics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">
                    Comprehensive reporting features will be available once connected to Supabase
                  </p>
                  <Button className="bg-warm hover:bg-warm/90">
                    Generate Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DoctorDashboard;