import { MemoryRouter } from "react-router-dom";
import * as renderer from "react-test-renderer";
import About from "../components/About";
import GeoInputBox from "../components/GeoInputBox";
import Map from "../components/Map";
import Home from "../Home";

const MockEnvironment: React.FC = ({
  children,
}: React.PropsWithChildren<Record<never, never>>) => {
  (window as any).google = {
    accounts: {
      id: {
        initialize: () => {},
        renderButton: () => {},
      },
    },
  };

  return (
    <>
      <MemoryRouter>{children}</MemoryRouter>
    </>
  );
};

test("snapshot", () => {
  renderer.create(
    <MockEnvironment>
      <Home />
    </MockEnvironment>
  );
});

test("Map", () => {
  renderer.create(
    <MockEnvironment>
      <Map />
    </MockEnvironment>
  );
});

test("About", () => {
  renderer.create(
    <MockEnvironment>
      <About />
    </MockEnvironment>
  );
});

test("GeoInputBox", () => {
  renderer.create(
    <MockEnvironment>
      <GeoInputBox />
    </MockEnvironment>
  );
});
