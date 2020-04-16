import React from "react";
import ReactGA from "react-ga";

import ChangeViewButtons from "../components/ChangeViewButtons";
import { useCardsContext } from "../contexts/Cards";

const ChangeViewButtonsContainer = () => {
  const { view, viewTypes, setView, setIsLoadingCards } = useCardsContext();

  const timeoutRef = React.useRef(null);

  const showLoadingCards = React.useCallback(() => {
    clearTimeout(timeoutRef.current);
    setIsLoadingCards(true);
    timeoutRef.current = setTimeout(() => setIsLoadingCards(false), 500);
  }, [setIsLoadingCards]);

  const onViewAll = React.useCallback(() => {
    showLoadingCards();
    setView(viewTypes.ALL.key);
    ReactGA.event({
      category: "change_view",
      action: "view_all",
      label: viewTypes.ALL.key,
    });
  }, [viewTypes, setView, showLoadingCards]);

  const onViewCurrentMonth = React.useCallback(() => {
    showLoadingCards();
    setView(viewTypes.CURRENT_MONTH.key);
    ReactGA.event({
      category: "change_view",
      action: "view_current_month",
      label: viewTypes.CURRENT_MONTH.key,
    });
  }, [viewTypes, setView, showLoadingCards]);

  const onViewNextMonth = React.useCallback(() => {
    showLoadingCards();
    setView(viewTypes.NEXT_MONTH.key);
    ReactGA.event({
      category: "change_view",
      action: "view_next_month",
      label: viewTypes.NEXT_MONTH.key,
    });
  }, [viewTypes, setView, showLoadingCards]);

  return (
    <ChangeViewButtons
      view={view}
      viewTypes={viewTypes}
      onViewAll={onViewAll}
      onViewCurrentMonth={onViewCurrentMonth}
      onViewNextMonth={onViewNextMonth}
    />
  );
};

export default ChangeViewButtonsContainer;