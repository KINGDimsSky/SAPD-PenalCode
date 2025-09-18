import { BookCheck, Crown, Home, Shield, UserPen } from "lucide-react";

export interface Violation {
  code: string;
  name: string;
  jailtime: number;
  fine: number;
}

export interface NavSubItem {
  href: string;
  label: string;
  requiredBadge?: string; 
}

export interface NavItem {
  href?: string;
  label: string;
  icon: React.ElementType;
  basePath?: string;
  adminOnly?: boolean;
  subItems?: NavSubItem[];
}

export const navItems: NavItem[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/publictools", label: "Public Tools", icon: BookCheck },
  { 
    label: "Factions", 
    icon: Shield, 
    basePath: "/factions",
    subItems: [
      { href: "/factions/penalcode", label: "Penal Code", requiredBadge: "SAPD" },
      { href: "/factions/Employe-file", label: "EmployeFile", requiredBadge: "SAPD" },
      { href: "/factions/sannewstools", label: "SanNews Tools", requiredBadge: "SANews"},
    ]
  },
  { href: "/setup-profile", label: "Profile", icon: UserPen },
  { href: "/admin", label: "Admin", icon: Crown, adminOnly: true },
];

export const penalCodeData: Violation[] = [
  { code: "1A1", name: "General Traffic Violation", jailtime: 0, fine: 250 },
  { code: "1A2", name: "Failure to pay any issued ticket", jailtime: 15, fine: 65 },
  { code: "1A3", name: "Driving any motorized vehicle without an official driving license", jailtime: 15, fine: 100 },
  { code: "1A4", name: "Maneuver any sea vehicles without official sailing licenses", jailtime: 15, fine: 100 },
  { code: "1A5a", name: "Driving any heavy truck without official trucking licenses", jailtime: 30, fine: 1500 },
  { code: "1A5b", name: "Driving any lorry truck without official trucking licenses", jailtime: 30, fine: 500 },
  { code: "1A6a", name: "Truck driving in any federal roads, in any inappropriate path, and without any permission from officers before", jailtime: 30, fine: 2000 },
  { code: "1A6b", name: "Lorry driving in any federal roads, in any inappropriate path, and without any permission from officers before", jailtime: 30, fine: 200 },
  { code: "1A7", name: "Flying any air vehicles without official flying licenses as a pilot", jailtime: 35, fine: 2250 },
  { code: "1A8", name: "Speeding", jailtime: 0, fine: 1000 },
  { code: "1A9", name: "Vehicle Parking Violation", jailtime: 0, fine: 450 },
  { code: "1A10", name: "Illegal Modifications On Vehicles", jailtime: 0, fine: 500 },
  { code: "1A11", name: "Unregistered Vehicles", jailtime: 0, fine: 250 },
  { code: "1A12", name: "Vehicular Endangerment", jailtime: 30, fine: 3000 },
  { code: "1A13", name: "Vehicular Manslaughter", jailtime: 40, fine: 450 },
  { code: "1A14", name: "DWI or DUI", jailtime: 15, fine: 300 },
  { code: "1A15", name: "Illegal Street Racing", jailtime: 25, fine: 350 },
  { code: "1A16", name: "Evading From Police", jailtime: 20, fine: 250 },
  { code: "1A17", name: "Flight Regulations", jailtime: 0, fine: 450 },
  { code: "1A18", name: "Misbehavely Maneuvering / Operating an Aircraft / Aircraft Endangerment", jailtime: 50, fine: 750 },
  { code: "1S", name: "Emergency Landing", jailtime: 0, fine: 400 },
  { code: "1T", name: "Failure to Yield to Emergency Vehicles", jailtime: 0, fine: 250 },
  { code: "1U", name: "Failure to Yield to A Roadblock", jailtime: 0, fine: 200 },
  { code: "1V", name: "Following An Emergency Vehicle", jailtime: 0, fine: 300 },
  { code: "1W", name: "Altering or Changing a Vehicle Identification Number", jailtime: 20, fine: 100 },
  { code: "2D", name: "Lumberjack License", jailtime: 25, fine: 2000 },
  { code: "2F", name: "Organizing a Small Illegal Event", jailtime: 25, fine: 5000 },
  { code: "2G", name: "Organizing a Big Illegal Event", jailtime: 35, fine: 7500 },
  { code: "3A", name: "Possessing of Marijuana / Pots (Small Amount)", jailtime: 5, fine: 400 },
  { code: "3B", name: "Possessing of Marijuana / Pots (Large Amount)", jailtime: 5, fine: 1200 },
  { code: "3C", name: "Possessing of Cocaine / Crack (Small Amount)", jailtime: 20, fine: 375 },
  { code: "3D", name: "Possessing of Cocaine / Crack (Large Amount)", jailtime: 25, fine: 750 },
  { code: "3E", name: "IUI or IWI", jailtime: 15, fine: 150 },
  { code: "3F", name: "Selling or distributing of illegal drugs", jailtime: 25, fine: 500 },
  { code: "3G", name: "Drug Manufacturing", jailtime: 35, fine: 500 },
  { code: "3H", name: "Being Present for Illegal Drug Use", jailtime: 10, fine: 100 },
  { code: "4A", name: "Possessing, Showing, And Display Any Usages of Sharp / Blunt Weapons", jailtime: 15, fine: 150 },
  { code: "4B", name: "Possessing of Illegal Firearms", jailtime: 40, fine: 500 },
  { code: "4C", name: "Possessing of Legal Firearms Without Official Firearms License", jailtime: 20, fine: 50 },
  { code: "4D", name: "Possessing Any Kind of Weapon Materials or Schematics", jailtime: 25, fine: 500 },
  { code: "4F", name: "Brandishing a Firearm or Weapon", jailtime: 20, fine: 200 },
  { code: "4G", name: "Unlawful Discharge of a Firearm or Weapon", jailtime: 25, fine: 200 },
  { code: "4H", name: "Possession of a Body Armor", jailtime: 10, fine: 400 },
  { code: "4I", name: "Weapon Trafficking", jailtime: 30, fine: 400 },
  { code: "4J", name: "Possessing Destructive Devices or Explosives", jailtime: 35, fine: 350 },
  { code: "5A", name: "Intimidation", jailtime: 10, fine: 50 },
  { code: "5B", name: "Assault", jailtime: 15, fine: 100 },
  { code: "5C", name: "Assault with Deadly Weapons", jailtime: 20, fine: 150 },
  { code: "5D", name: "Battery", jailtime: 25, fine: 200 },
  { code: "5E", name: "Aggravated Battery", jailtime: 30, fine: 250 },
  { code: "5F", name: "Attempted Murdering", jailtime: 30, fine: 200 },
  { code: "5G", name: "Murdering", jailtime: 50, fine: 400 },
  { code: "5H", name: "Committed a group criminal assault with or without weapons", jailtime: 30, fine: 250 },
  { code: "5I", name: "Performing A Drive-By Using Light or Heavy Fire Arms", jailtime: 35, fine: 300 },
  { code: "5J", name: "Melee Robbery", jailtime: 15, fine: 100 },
  { code: "5K", name: "Armed Robbery", jailtime: 30, fine: 150 },
  { code: "5L", name: "Piracy", jailtime: 20, fine: 150 },
  { code: "5M", name: "Grand Theft", jailtime: 25, fine: 250 },
  { code: "5N", name: "Grand Theft Auto", jailtime: 15, fine: 250 },
  { code: "5O", name: "Grand Theft of Firearms", jailtime: 15, fine: 100 },
  { code: "5P", name: "Abuse or Desecration of Dead Human Body", jailtime: 15, fine: 200 },
  { code: "5Q", name: "Kidnapping", jailtime: 30, fine: 350 },
  { code: "5R", name: "Hostage Taking", jailtime: 60, fine: 250 },
  { code: "5S", name: "Torture", jailtime: 20, fine: 150 },
  { code: "5T", name: "Blackmail", jailtime: 10, fine: 100 },
  { code: "5U", name: "Human Trafficking", jailtime: 65, fine: 550 },
  { code: "6A", name: "Sexual Harassment", jailtime: 10, fine: 500 },
  { code: "6B", name: "Rape", jailtime: 60, fine: 300 },
  { code: "6C", name: "Statutory Rape", jailtime: 75, fine: 500 },
  { code: "6D", name: "Prostitution", jailtime: 30, fine: 250 },
  { code: "6E", name: "Solicitation of Sexual Engagement", jailtime: 30, fine: 250 },
  { code: "6F", name: "Being Naked In Public", jailtime: 5, fine: 50 },
  { code: "6G", name: "Performs Any Sexual Action in Public", jailtime: 15, fine: 150 },
  { code: "7A", name: "Initiating A Riot", jailtime: 15, fine: 200 },
  { code: "7B", name: "Failing to Disperse After Lawfully Ordered by The Officials", jailtime: 20, fine: 250 },
  { code: "7C", name: "Participating in a Riot", jailtime: 10, fine: 75 },
  { code: "7D", name: "Spitting in Public Space", jailtime: 0, fine: 150 },
  { code: "7E", name: "Pee in Public", jailtime: 0, fine: 150 },
  { code: "7F", name: "Drunk in Public Space", jailtime: 0, fine: 200 },
  { code: "7G", name: "Vilification", jailtime: 15, fine: 100 },
  { code: "7H", name: "Hate Speech", jailtime: 20, fine: 150 },
  { code: "7I", name: "Vigilantism", jailtime: 30, fine: 300 },
  { code: "7J", name: "Disturbing Public Peace", jailtime: 15, fine: 100 },
  { code: "7K", name: "Brawl in Public Space", jailtime: 20, fine: 150 },
  { code: "7M", name: "Jaywalk", jailtime: 0, fine: 50 },
  { code: "7N", name: "Littering the Public Facility / Space", jailtime: 0, fine: 250 },
  { code: "7O", name: "Unlawful Assembly", jailtime: 20, fine: 100 },
  { code: "7P", name: "Stalking", jailtime: 20, fine: 200 },
  { code: "7Q", name: "Public Intoxication", jailtime: 10, fine: 250 },
  { code: "7R", name: "Animal Abuse", jailtime: 20, fine: 500 },
  { code: "7S", name: "Animal Cruelty", jailtime: 0, fine: 300 },
  { code: "8A", name: "Obstruction of Justice", jailtime: 15, fine: 30 },
  { code: "8B", name: "Abusing Government Hotline", jailtime: 10, fine: 100 },
  { code: "8C", name: "Governments Attribute", jailtime: 60, fine: 100 },
  { code: "8D", name: "Impersonating Government Staff", jailtime: 60, fine: 100 },
  { code: "8E", name: "Attempting to Bribe or Corrupt Any Public Officials", jailtime: 15, fine: 200 },
  { code: "8F", name: "Attempting to bribe, corrupt or prevent any crime’s witnesses to step out and give out information to law enforcers", jailtime: 10, fine: 60 },
  { code: "8G", name: "Making a False Report", jailtime: 20, fine: 200 },
  { code: "8H", name: "Giving False Information to the Police Officials", jailtime: 20, fine: 125 },
  { code: "8I", name: "Perjury", jailtime: 20, fine: 500 },
  { code: "8J", name: "Assaulting on LEO", jailtime: 40, fine: 150 },
  { code: "8K", name: "Attempted Murdering A Public Officials", jailtime: 60, fine: 500 },
  { code: "8L", name: "Murdering A Public Officials", jailtime: 70, fine: 600 },
  { code: "8M", name: "Harbouring Criminals", jailtime: 30, fine: 250 },
  { code: "8N", name: "Fraud / Scam", jailtime: 20, fine: 250 },
  { code: "8O", name: "Forgery", jailtime: 30, fine: 500 },
  { code: "8P", name: "Corruption", jailtime: 300, fine: 5000 },
  { code: "9A", name: "Trespassing", jailtime: 5, fine: 300 },
  { code: "9B", name: "Trespassing Government Property", jailtime: 20, fine: 100 },
  { code: "9C", name: "Vandalism", jailtime: 15, fine: 250 },
  { code: "9D", name: "Arson", jailtime: 30, fine: 250 },
  { code: "9E", name: "Extortion", jailtime: 20, fine: 150 },
  { code: "9F", name: "Using Property As Illegal Distribution", jailtime: 60, fine: 300 },
];