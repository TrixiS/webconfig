import React from "react";
import Page from "./components/Page";
import useFetcher from "./lib/useFetcher";
import SchemaPage, { SchemaProperty } from "./components/SchemaPage";
import Button from "./components/Button";
import { Switch, Route } from "react-router-dom";
import { ConfigSchema } from "./lib/configTypes";
import { Sidebar, Header, Content, SidebarLink } from "./components/Layout";
import { logo, configIcon, phrasesIcon, circleIcon } from "./icons";

export const apiUrl = "http://localhost:5000";

const pageIcons: Record<string, JSX.Element> = {
  config: configIcon,
  phrases: phrasesIcon,
};

export default function App() {
  const { data: configSchema } = useFetcher<ConfigSchema>(`${apiUrl}/schema`);
  const { data: configData, mutate: mutateConfigData } = useFetcher<
    Record<string, any>
  >(`${apiUrl}/config`);
  const { data: phrasesData, mutate: mutatePhrasesData } = useFetcher<
    Record<string, string>
  >(`${apiUrl}/phrases`);

  // TODO: make loading screen (red logo pulse)
  // TODO: компонент, который выплевывает импуты при получении объекта из пропов
  //       и возвращает объект с данными
  // TODO: add desc to the pages (Config and the desc below)
  if (!configSchema || !configData || !phrasesData) return <>Loading...</>;

  return (
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
              const schema = configSchema.definitions[nameCapital].properties;
              const data = nameCapital === "Config" ? configData : phrasesData;

              for (const key of Object.keys(schema)) {
                const dataValue = data[key];

                if (dataValue !== undefined)
                  (schema[key] as SchemaProperty).value = dataValue;
              }

              const handleSave = async (inputData: Record<string, any>) => {
                await fetch(`${apiUrl}/${name}`, {
                  method: "POST",
                  body: JSON.stringify(inputData),
                  headers: { "Content-Type": "application/json" },
                });

                if (nameCapital === "Config") mutateConfigData(inputData);
                else if (nameCapital === "Phrases")
                  mutatePhrasesData(inputData);
              };

              return (
                <Route path={`/${name}`} key={index}>
                  <SchemaPage
                    className="flex flex-col max-w-2xl"
                    formProps={{ className: "flex flex-col gap-y-4" }}
                    title={property.title}
                    schema={schema}
                    onSave={handleSave}
                  >
                    <Button className="float-right" type="submit">
                      Save
                    </Button>
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
