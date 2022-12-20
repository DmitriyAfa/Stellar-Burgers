import React from "react";
import { useLocation } from "react-router-dom";

// Helpers
import getCoords from "../../../../../services/utils/helpers/getCoords";

// Styles
import Styles from "./menu.module.scss";

const Menu = React.forwardRef(
  (
    props: {
      menuItems: { text: string; id: string; uuid: string }[];
      scollableContainerRef: React.RefObject<HTMLDivElement>;
      contentContainersRef: React.RefObject<HTMLDivElement[]>;
    },
    ref
  ) => {
    const location = useLocation();
    const [activeMenuTab, setActiveMenuTab] = React.useState<string>(
      props.menuItems[0].id
    );

    const scrollToNeededSection = React.useCallback(
      (sectionId: string) => {
        if (
          !props.scollableContainerRef.current ||
          !props.contentContainersRef.current
        )
          return;

        const neededRefs: (HTMLElement | null)[] =
          props.contentContainersRef.current.filter(
            (contentSectionRef: HTMLElement | null) =>
              contentSectionRef!.getAttribute("id") === sectionId
          );

        const neededRef: HTMLElement = neededRefs.shift()!,
          valueForScroll: number =
            getCoords(neededRef, props.scollableContainerRef.current).top +
            props.scollableContainerRef.current.scrollTop; // Находим позицию нужной секции по отношению к странице

        props.scollableContainerRef.current.scrollTo(0, valueForScroll);
      },
      [props.scollableContainerRef, props.contentContainersRef]
    );

    const changeActiveMenuItem: (e: React.MouseEvent<HTMLElement>) => void =
      React.useCallback(
        (e) => {
          const target: HTMLElement = e.currentTarget!,
            target__anchor: string = target.getAttribute("data-anchor")!;

          scrollToNeededSection(target__anchor);
        },
        [scrollToNeededSection]
      );

    React.useImperativeHandle(ref, () => ({
      handleScrollOfContent() {
        if (
          !props.scollableContainerRef.current ||
          !props.contentContainersRef.current
        )
          return;

        const activeSections: (HTMLElement | null)[] =
          props.contentContainersRef.current.filter(
            (scrollableContent__section: HTMLElement | null) =>
              getCoords(
                scrollableContent__section!,
                props.scollableContainerRef.current!
              ).top < 50
          );

        const activeSection: HTMLElement = activeSections.pop()!,
          activeSection__id: string = activeSection.getAttribute("id")!;

        setActiveMenuTab(activeSection__id);
      },
    }));

    return (
      <section className={Styles.menu}>
        <ul className={Styles.menu__items}>
          {props.menuItems.map(
            (
              menuItem: { id: string; text: string; uuid: string },
              menuItemIndex: number
            ) => {
              return (
                <li
                  key={menuItem.uuid}
                  className={Styles.items__item}
                  data-active={menuItem.id === activeMenuTab}
                  data-anchor={menuItem.id}
                  onClick={changeActiveMenuItem}
                >
                  <span className={Styles.item__text}>{menuItem.text}</span>
                </li>
              );
            }
          )}
        </ul>
      </section>
    );
  }
);

export default Menu;
