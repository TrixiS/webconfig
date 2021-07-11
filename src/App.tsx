import React from "react";
import Page from "./components/Page";
import useFetcher from "./lib/useFetcher";
import { ConfigSchema } from "./lib/configTypes";
import { Sidebar, Header, Content, SidebarLink } from "./components/Layout";
import { logo, configIcon, phrasesIcon } from "./icons";

export const apiUrl = "http://localhost:5000";

const icons: Record<string, JSX.Element> = {
  config: configIcon,
  phrases: phrasesIcon,
};

export default function App() {
  const { data: configSchema } = useFetcher<ConfigSchema>(`${apiUrl}/schema`);

  // TODO: make loading screen (red logo pulse)
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
            <SidebarLink to={`/${name}`} icon={icons[name]} key={index}>
              {property.title}
            </SidebarLink>
          );
        })}
      </Sidebar>

      <div className="flex flex-col w-10/12 h-full">
        <Header className="shadow z-10" />
        <Content>
          {/* Routes here */}
          <Page title="Dashboard">Some cool test content</Page>
        </Content>
      </div>
    </div>
  );
}
