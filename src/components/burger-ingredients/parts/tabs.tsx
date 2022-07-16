
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { ITabs } from "../types";
declare module 'react' {
  interface FunctionComponent<P = {}> {
    (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
  }
}

const Tabs = ({ activeTab }: ITabs) =>{
  return (
    <div className="mt-5" style={{ display: "flex" }}>
      <Tab value="one" active={activeTab === "one"}>
        Булки
      </Tab>
      <Tab value="two" active={activeTab === "two"}>
        Соусы
      </Tab>
      <Tab value="three" active={activeTab === "three"}>
        Начинки
      </Tab>
    </div>
  );
}

export default Tabs;
