import React from "react";
import Page from "./components/Page";
import useFetcher from "./lib/useFetcher";
import SchemaPage from "./pages/SchemaPage";
import { Switch, Route } from "react-router-dom";
import { ConfigSchema } from "./lib/configTypes";
import { Sidebar, Header, Content, SidebarLink } from "./components/Layout";
import { logo, configIcon, phrasesIcon } from "./icons";

export const apiUrl = "http://localhost:5000";

const pageIcons: Record<string, JSX.Element> = {
  config: configIcon,
  phrases: phrasesIcon,
};

export default function App() {
  const { data: configSchema } = useFetcher<ConfigSchema>(`${apiUrl}/schema`);

  // TODO: make loading screen (red logo pulse)
  // TODO: компонент, который выплевывает импуты при получении объекта из пропов
  //       и возвращает объект с данными
  // TODO: add desc to the pages (Config and the desc below)
  if (!configSchema) return <>Loading...</>;
  else console.log(configSchema);

  return (
    /*
        TODO: left side menu
              create config page
              start bot button
              started indicator

        Sidebar (Pages) | Start bot button (float right) with indicator in the button
        Config
        Phrases

        Run the bot first and get the channels/roles

        Take phrases translate text from json
        TODO: SidebarLink
      */
    <div className="App flex flex-row w-full h-screen">
      <Sidebar className="w-2/12 h-screen border-r border-gray-200" icon={logo}>
        {Object.entries(configSchema.properties).map((entry, index) => {
          const [name, property] = entry;

          return (
            <SidebarLink to={`/${name}`} icon={pageIcons[name]} key={index}>
              {property.title}
            </SidebarLink>
          );
        })}
      </Sidebar>

      <div className="flex flex-col w-10/12 h-full">
        <Header className="shadow z-10" />
        <Content>
          <Switch>
            {Object.entries(configSchema.properties).map((entry, index) => {
              const [name, property] = entry;
              const nameCapital = name.charAt(0).toUpperCase() + name.slice(1);

              // TODO: you probably have to parse it from the actual config
              const schema = configSchema.definitions[nameCapital].properties;

              return (
                <Route path={`/${name}`} key={index}>
                  <SchemaPage
                    className="flex flex-col max-w-5xl"
                    formProps={{ className: "flex flex-col gap-y-4" }}
                    title={property.title}
                    schema={schema}
                    key={index}
                  >
                    <button className="float-right" type="submit">
                      Save
                    </button>
                  </SchemaPage>
                </Route>
              );
            })}
          </Switch>
        </Content>
      </div>
    </div>
  );
}
