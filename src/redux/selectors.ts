import { RootState } from './store';
import { createSelector } from 'reselect'

export const selectNews = (state: RootState) => {
  return state.newsPage.news;
};

export const selectFilteredNews = createSelector(
  (state: RootState) => state.newsPage.news,
  (state: RootState) => state.newsPage.filter,
  (news, filter) => news.filter((n) => n.description.toLowerCase().includes(filter.toLowerCase()))
)

export const selectAuth = (state: RootState) => {
  return state.authPage.isAuth;
}

export const selectCatalog = (state: RootState) => {
  return state.catalogPage.houses;
};

export const selectFilters = (state: RootState) => {
  return state.catalogPage.filters;
}

export const selectFilteredCatalog = createSelector(
  (state: RootState) => state.catalogPage.houses,
  (state: RootState) => state.catalogPage.filters,
  (houses, filters) => houses.filter((h) => {
    return (h.address === filters.address || filters.address === "Выберите") &&
    (h.bed === filters.bed  || filters.bed === "Выберите") &&
    (h.metro === filters.metro  || filters.metro === "Выберите") &&
    (h.room === filters.room  || filters.room === "Выберите")
  }).filter((h) => {
    if (!filters.from && !filters.to) {
        return true
    } else if (!filters.from && filters.to) {
        return +h.price.slice(0, -4) <= +filters.to
    } else if (filters.from && !filters.to) {
        return +h.price.slice(0, -4) >= +filters.from
    } else return (
        (+h.price.slice(0, -4) >= +filters.from) &&
        (+h.price.slice(0, -4) <= +filters.to)
    )
  }).sort((a, b) => {
    if (filters.sort === "По возрастанию цены") {
        return Number(a.price.slice(0, -4)) - Number(b.price.slice(0, -4))
    }
    if (filters.sort === "По убыванию цены") {
        return Number(b.price.slice(0, -4)) - Number(a.price.slice(0, -4))
    }
    if (filters.sort === "По возрастанию спальных мест") {
        return Number(a.bed) - Number(b.bed)
    }
    if (filters.sort === "По убыванию спальных мест") {
        return Number(b.bed) - Number(a.bed)
    }
    if (filters.sort === "По возрастанию комнат") {
        return Number(a.room.slice(0, -6)) - Number(b.room.slice(0, -6))
    }
    if (filters.sort === "По убыванию комнат") {
        return Number(b.room.slice(0, -6)) - Number(a.room.slice(0, -6))
    } else return Number(a.id) - Number(b.id)
  })
)
