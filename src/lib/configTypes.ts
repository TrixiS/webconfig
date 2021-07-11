export type ConfigType = {
  title: string;
  type: string;
};

export type ConfigProperty = ConfigType & {
  default?: string;
  description?: string;
};

export type ConfigObject = ConfigType & {
  properties: Record<string, ConfigProperty>;
  required: string[];
};

export type ConfigSchema = ConfigObject & {
  definitions: Record<string, ConfigObject>;
};
