import { useEffect } from "react";

interface Location {
  id: string;
  latitude: number;
  longitude: number;
  name: string;
  type: "patient" | "guardian" | "emergency";
  lastUpdated: string;
}

interface SafeZone {
  id: string;
  latitude: number;
  longitude: number;
  radius: number;
  name: string;
}

interface PatientTrackingMapProps {
  locations: Location[];
  safeZones: SafeZone[];
  center?: [number, number];
  zoom?: number;
}

const PatientTrackingMap = ({ 
  locations = [], 
  safeZones = [], 
  center = [40.7128, -74.0060], // Default to NYC
  zoom = 13 
}: PatientTrackingMapProps) => {
  useEffect(() => {
    // Request location permission
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Current location:", position.coords);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);

  return (
    <div className="w-full h-[600px] rounded-lg overflow-hidden border bg-gray-100 flex items-center justify-center">
      <div className="text-center p-8">
        <div className="bg-white rounded-lg p-6 shadow-lg max-w-md">
          <h3 className="text-lg font-semibold text-gentle-foreground mb-4">Map Temporarily Disabled</h3>
          <p className="text-sm text-muted-foreground mb-4">
            The map component has been temporarily replaced to resolve React Context errors.
          </p>
          
          <div className="space-y-3">
            <div className="text-left">
              <h4 className="font-medium text-gentle-foreground">Your Locations ({locations.length})</h4>
              {locations.map((location) => (
                <div key={location.id} className="text-xs text-muted-foreground">
                  • {location.name} ({location.type})
                </div>
              ))}
            </div>
            
            <div className="text-left">
              <h4 className="font-medium text-gentle-foreground">Safe Zones ({safeZones.length})</h4>
              {safeZones.map((zone) => (
                <div key={zone.id} className="text-xs text-muted-foreground">
                  • {zone.name} ({zone.radius}m radius)
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-4 text-xs text-muted-foreground">
            Center: {center[0].toFixed(4)}, {center[1].toFixed(4)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientTrackingMap;