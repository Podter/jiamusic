import { Button } from "./ui/Button";
import { Link } from "react-router-dom";
import { Home16Regular, Search12Regular } from "@fluentui/react-icons";

export default function Sidebar() {
  return (
    <aside className="space-y-4 py-4 border-r w-64 h-[calc(100vh-2.5rem)] bg-background">
      <div className="px-4">
        <nav className="space-y-1">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            asChild
          >
            <Link to="/">
              <Home16Regular className="mr-2 h-4 w-4" />
              Home
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            asChild
          >
            <Link to="/search">
              <Search12Regular className="mr-2 h-4 w-4" />
              Search
            </Link>
          </Button>
        </nav>
      </div>
    </aside>
  );
}
