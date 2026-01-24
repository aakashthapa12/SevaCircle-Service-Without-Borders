export interface Service {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export const services: Service[] = [
  {
    id: "plumber",
    name: "Plumber",
    icon: "🔧",
    description: "Fix leaks, install pipes & fixtures",
  },
  {
    id: "electrician",
    name: "Electrician",
    icon: "⚡",
    description: "Wiring, repairs & installations",
  },
  {
    id: "carpenter",
    name: "Carpenter",
    icon: "🪵",
    description: "Furniture, doors & woodwork",
  },
  {
    id: "painter",
    name: "Painter",
    icon: "🎨",
    description: "Interior & exterior painting",
  },
  {
    id: "mechanic",
    name: "Mechanic",
    icon: "🔩",
    description: "Vehicle repair & maintenance",
  },
  {
    id: "cleaner",
    name: "Cleaner",
    icon: "🧹",
    description: "Home & office cleaning",
  },
];
