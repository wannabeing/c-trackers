import { HashRouter, Switch, Route } from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";

function Router() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/:id">
          <Coin />
        </Route>
        <Route path={process.env.PUBLIC_URL + "/"}>
          <Coins />
        </Route>
      </Switch>
    </HashRouter>
  );
}
export default Router;
