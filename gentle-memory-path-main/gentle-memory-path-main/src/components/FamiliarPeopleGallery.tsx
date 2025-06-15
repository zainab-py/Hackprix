import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ImagePlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Person {
  id: string;
  name: string;
  relation: string;
  memoryLine: string;
  imageUrl: string;
}

const FamiliarPeopleGallery = () => {
  const [people, setPeople] = useState<Person[]>([
    {
      id: "1",
      name: "Sarah",
      relation: "Daughter",
      memoryLine: "You taught me how to ride a bike in the park",
      imageUrl: "/lovable-uploads/photo-1649972904349-6e44c42644a7.jpg"
    },
    {
      id: "2", 
      name: "Michael",
      relation: "Son",
      memoryLine: "We go fishing together every summer",
      imageUrl: "/lovable-uploads/photo-1488590528505-98d2b5aba04b.jpg"
    },
    {
      id: "3",
      name: "Emma",
      relation: "Granddaughter", 
      memoryLine: "You read bedtime stories to me every night",
      imageUrl: "/lovable-uploads/photo-1581091226825-a6a2a5aee158.jpg"
    }
  ]);

  const [isAddingPerson, setIsAddingPerson] = useState(false);
  const [newPerson, setNewPerson] = useState({
    name: "",
    relation: "",
    memoryLine: "",
    imageFile: null as File | null
  });

  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setNewPerson({ ...newPerson, imageFile: file });
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a JPG or PNG image",
        variant: "destructive"
      });
    }
  };

  const handleAddPerson = () => {
    if (newPerson.name && newPerson.relation && newPerson.memoryLine && newPerson.imageFile) {
      const imageUrl = URL.createObjectURL(newPerson.imageFile);
      const person: Person = {
        id: Date.now().toString(),
        name: newPerson.name,
        relation: newPerson.relation,
        memoryLine: newPerson.memoryLine,
        imageUrl
      };
      
      setPeople([...people, person]);
      setNewPerson({ name: "", relation: "", memoryLine: "", imageFile: null });
      setIsAddingPerson(false);
      
      toast({
        title: "Person added!",
        description: `${newPerson.name} has been added to your gallery`,
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-semibold text-gentle-foreground mb-2">
          People Who Love You
        </h2>
        <p className="text-lg text-muted-foreground">
          These special people are always thinking of you
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {people.map((person) => (
          <Card key={person.id} className="overflow-hidden bg-gentle border-gentle-foreground/10 hover:shadow-lg transition-all duration-300">
            <div className="aspect-square overflow-hidden">
              <img
                src={person.imageUrl}
                alt={person.name}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="text-xl font-semibold text-gentle-foreground mb-1">
                {person.name}
              </h3>
              <p className="text-warm font-medium mb-2">
                Your {person.relation}
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                "{person.memoryLine}"
              </p>
            </CardContent>
          </Card>
        ))}

        {/* Add Person Card */}
        <Card className="overflow-hidden bg-gentle/50 border-dashed border-2 border-gentle-foreground/20 hover:border-warm transition-all duration-300">
          {!isAddingPerson ? (
            <div 
              className="aspect-square flex flex-col items-center justify-center cursor-pointer p-4"
              onClick={() => setIsAddingPerson(true)}
            >
              <div className="w-16 h-16 bg-warm/10 rounded-full flex items-center justify-center mb-4">
                <ImagePlus size={32} className="text-warm" />
              </div>
              <h3 className="text-lg font-medium text-gentle-foreground mb-2">
                Add Someone Special
              </h3>
              <p className="text-sm text-muted-foreground text-center">
                Click to add a new person to your gallery
              </p>
            </div>
          ) : (
            <div className="p-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gentle-foreground mb-1">
                    Photo
                  </label>
                  <input
                    type="file"
                    accept="image/jpeg,image/png"
                    onChange={handleImageUpload}
                    className="w-full text-sm text-gentle-foreground file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-warm file:text-warm-foreground hover:file:bg-warm/90"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gentle-foreground mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={newPerson.name}
                    onChange={(e) => setNewPerson({ ...newPerson, name: e.target.value })}
                    className="w-full p-2 border rounded-md bg-background text-foreground"
                    placeholder="Enter their name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gentle-foreground mb-1">
                    Relation
                  </label>
                  <input
                    type="text"
                    value={newPerson.relation}
                    onChange={(e) => setNewPerson({ ...newPerson, relation: e.target.value })}
                    className="w-full p-2 border rounded-md bg-background text-foreground"
                    placeholder="e.g., Daughter, Friend, Neighbor"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gentle-foreground mb-1">
                    Special Memory
                  </label>
                  <textarea
                    value={newPerson.memoryLine}
                    onChange={(e) => setNewPerson({ ...newPerson, memoryLine: e.target.value })}
                    className="w-full p-2 border rounded-md bg-background text-foreground h-20"
                    placeholder="A happy memory you share together"
                  />
                </div>
                
                <div className="flex space-x-2">
                  <Button onClick={handleAddPerson} className="flex-1 bg-warm hover:bg-warm/90 text-warm-foreground">
                    Add Person
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsAddingPerson(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default FamiliarPeopleGallery;