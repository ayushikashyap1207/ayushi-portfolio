import {
  siApachekafka,
  siC,
  siCoursera,
  siCss,
  siDocker,
  siExpress,
  siFastapi,
  siFlask,
  siGithub,
  siGradio,
  siHtml5,
  siHuggingface,
  siJavascript,
  siLangchain,
  siMediapipe,
  siMongodb,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siNumpy,
  siOllama,
  siOpencv,
  siPandas,
  siPostgresql,
  siPytest,
  siPytorch,
  siPython,
  siReact,
  siRedis,
  siScikitlearn,
  siSupabase,
  siTailwindcss,
  siTensorflow,
  siTypescript,
  siVite,
} from "simple-icons";
import { TECH } from "./data";

const ICONS = {
  python: siPython,
  javascript: siJavascript,
  typescript: siTypescript,
  c: siC,
  pytorch: siPytorch,
  tensorflow: siTensorflow,
  scikitlearn: siScikitlearn,
  pandas: siPandas,
  numpy: siNumpy,
  opencv: siOpencv,
  langchain: siLangchain,
  huggingface: siHuggingface,
  gradio: siGradio,
  ollama: siOllama,
  fastapi: siFastapi,
  flask: siFlask,
  nodedotjs: siNodedotjs,
  express: siExpress,
  react: siReact,
  nextdotjs: siNextdotjs,
  tailwindcss: siTailwindcss,
  vite: siVite,
  postgresql: siPostgresql,
  mysql: siMysql,
  mongodb: siMongodb,
  redis: siRedis,
  apachekafka: siApachekafka,
  docker: siDocker,
  supabase: siSupabase,
  github: siGithub,
  mediapipe: siMediapipe,
  html5: siHtml5,
  css: siCss,
  pytest: siPytest,
  coursera: siCoursera,
};

export function TechIcon({ id, className = "" }) {
  const tech = TECH[id];
  if (!tech) return null;

  if (tech.mono) {
    return <span className={`tech-mono ${className}`.trim()}>{tech.mono}</span>;
  }

  const icon = ICONS[tech.icon];
  if (!icon) {
    return (
      <span className={`tech-mono ${className}`.trim()}>
        {tech.label.slice(0, 2)}
      </span>
    );
  }

  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path d={icon.path} fill="currentColor" />
    </svg>
  );
}

export function techBrand(id) {
  const tech = TECH[id];
  if (!tech || tech.mono) return undefined;
  const icon = ICONS[tech.icon];
  return icon?.hex ? `#${icon.hex}` : undefined;
}

function relativeLuminance(hex) {
  const value = hex.replace("#", "");
  const channels = [0, 2, 4]
    .map((index) => parseInt(value.slice(index, index + 2), 16) / 255)
    .map((channel) =>
      channel <= 0.03928
        ? channel / 12.92
        : Math.pow((channel + 0.055) / 1.055, 2.4)
    );
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

export function techIconBackground(id) {
  const tech = TECH[id];
  if (!tech || tech.mono) return "transparent";
  const icon = ICONS[tech.icon];
  if (!icon?.hex) return "transparent";

  const brand = `#${icon.hex}`;
  const cream = "#f2efff";
  const l1 = relativeLuminance(brand);
  const l2 = relativeLuminance(cream);
  const contrast = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

  return contrast < 3 ? "var(--ink)" : "transparent";
}
