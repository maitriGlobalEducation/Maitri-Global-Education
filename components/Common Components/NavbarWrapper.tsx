import { getExploreAreas } from "@/services/areas.service";
import Navbar from "./Navbar";

export default async function NavbarWrapper() {
  const exploreAreas = await getExploreAreas();

  return <Navbar exploreAreas={exploreAreas} />;
}
