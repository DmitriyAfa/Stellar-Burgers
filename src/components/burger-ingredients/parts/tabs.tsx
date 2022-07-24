
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
      <Tab value="one" active={activeTab === "one"} onClick={() => console.log()}>
        Булки
      </Tab>
      <Tab value="two" active={activeTab === "two"} onClick={() => console.log()}>
        Соусы
      </Tab>
      <Tab value="three" active={activeTab === "three"} onClick={() => console.log()}>
        Начинки
      </Tab>
    </div>
  );
}

export default Tabs;
