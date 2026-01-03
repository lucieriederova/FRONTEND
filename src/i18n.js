// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  cs: {
    translation: {
      "app_title": "Groove List",
      "loading": "načítám data...",
      "error": "nastala chyba",
      "active": "aktivní",
      "archived": "archivované",
      "show": "zobrazit:",
      "add_list": "přidat seznam",
      "add_list_placeholder": "název seznamu...",
      "create": "vytvořit",
      "owner_label": "vlastník:",
      "members_label": "členové:",
      "resolved_count": "vyřešeno:",
      "items": "položky",
      "add_item": "přidat položku...",
      "add": "přidat",
      "back": "zpět na přehled",
      "leave": "odejít",
      "leave_confirm": "Opravdu chcete opustit tento seznam?",
      "delete_confirm_title": "Smazat seznam?",
      "delete_confirm_text": "Opravdu chcete smazat tento seznam?",
      "yes_delete": "ano, smazat",
      "no_keep": "ne, ponechat",
      "chart_overview": "stav seznamů",
      "chart_detail": "stav položek",
      "item_resolved": "vyřešeno",
      "item_unresolved": "nevyřešeno",
      "total_items": "celkem",
      "finished_items": "hotovo",
      "empty_active": "žádné aktivní seznamy",
      "empty_archived": "žádné archivované seznamy.",
      "filter_all": "vše",
      "filter_active_items": "nevyřešené"
    }
  },
  en: {
    translation: {
      "app_title": "Groove List",
      "loading": "loading data...",
      "error": "an error occurred",
      "active": "active",
      "archived": "archived",
      "show": "show:",
      "add_list": "add list",
      "add_list_placeholder": "list name...",
      "create": "create",
      "owner_label": "owner:",
      "members_label": "members:",
      "resolved_count": "resolved:",
      "items": "items",
      "add_item": "add item...",
      "add": "add",
      "back": "back to overview",
      "leave": "leave",
      "leave_confirm": "do you really want to leave this list?",
      "delete_confirm_title": "delete list?",
      "delete_confirm_text": "do you really want to delete this list?",
      "yes_delete": "yes, delete",
      "no_keep": "no, keep",
      "chart_overview": "lists statistics",
      "chart_detail": "items status",
      "item_resolved": "resolved",
      "item_unresolved": "unresolved",
      "total_items": "total",
      "finished_items": "finished",
      "empty_active": "no active lists.",
      "empty_archived": "no archived lists.",
      "filter_all": "all",
      "filter_active_items": "active"
    }
  },
  de: { 
    translation: {
      "app_title": "Groove List",
      "loading": "Daten werden geladen...",
      "error": "ein Fehler ist aufgetreten",
      "active": "aktiv",
      "archived": "archiviert",
      "show": "anzeigen:",
      "add_list": "Liste hinzufügen",
      "add_list_placeholder": "Listenname...",
      "create": "erstellen",
      "owner_label": "Besitzer:",
      "members_label": "Mitglieder:",
      "resolved_count": "erledigt:",
      "items": "Elemente",
      "add_item": "Element hinzufügen...",
      "add": "hinzufügen",
      "back": "zurück zur Übersicht",
      "leave": "verlassen",
      "leave_confirm": "Möchten Sie diese Liste wirklich verlassen?",
      "delete_confirm_title": "Liste löschen?",
      "delete_confirm_text": "Möchten Sie diese Liste wirklich löschen?",
      "yes_delete": "ja, löschen",
      "no_keep": "nein, behalten",
      "chart_overview": "Listenstatistik",
      "chart_detail": "Status der Elemente",
      "item_resolved": "erledigt",
      "item_unresolved": "Offen",
      "total_items": "gesamt",
      "finished_items": "fertig",
      "empty_active": "keine aktiven Listen.",
      "empty_archived": "keine archivierten Listen.",
      "filter_all": "alle",
      "filter_active_items": "offene"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "cs",
    fallbackLng: "en",
    interpolation: { escapeValue: false }
  });

export default i18n;