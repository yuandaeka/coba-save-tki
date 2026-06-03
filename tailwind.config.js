/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
        "colors": {
            "error-container": "#ffdad6",
            "surface": "#f8f9ff",
            "on-tertiary-fixed-variant": "#004395",
            "error": "#ba1a1a",
            "tertiary-fixed-dim": "#adc6ff",
            "on-secondary-fixed-variant": "#005048",
            "surface-tint": "#565e74",
            "tertiary-container": "#001a42",
            "inverse-primary": "#bec6e0",
            "surface-container": "#e5eeff",
            "surface-container-highest": "#d3e4fe",
            "secondary-fixed": "#71f8e4",
            "on-secondary-fixed": "#00201c",
            "tertiary": "#000000",
            "inverse-surface": "#213145",
            "outline-variant": "#c6c6cd",
            "secondary-container": "#6df5e1",
            "surface-bright": "#f8f9ff",
            "surface-container-low": "#eff4ff",
            "on-tertiary-container": "#3980f4",
            "on-surface-variant": "#45464d",
            "on-error-container": "#93000a",
            "on-error": "#ffffff",
            "on-surface": "#0b1c30",
            "on-primary": "#ffffff",
            "on-tertiary-fixed": "#001a42",
            "primary-container": "#131b2e",
            "surface-dim": "#cbdbf5",
            "inverse-on-surface": "#eaf1ff",
            "outline": "#76777d",
            "background": "#f8f9ff",
            "primary-fixed": "#dae2fd",
            "surface-container-lowest": "#ffffff",
            "on-secondary": "#ffffff",
            "secondary": "#006b5f",
            "on-tertiary": "#ffffff",
            "on-background": "#0b1c30",
            "on-primary-container": "#7c839b",
            "primary-fixed-dim": "#bec6e0",
            "on-primary-fixed": "#131b2e",
            "secondary-fixed-dim": "#4fdbc8",
            "on-secondary-container": "#006f64",
            "on-primary-fixed-variant": "#3f465c",
            "primary": "#000000",
            "tertiary-fixed": "#d8e2ff",
            "surface-container-high": "#dce9ff",
            "surface-variant": "#d3e4fe"
        },
        "borderRadius": {
            "DEFAULT": "0.25rem",
            "lg": "0.5rem",
            "xl": "0.75rem",
            "full": "9999px"
        },
        "spacing": {
            "stack-lg": "2rem",
            "stack-sm": "0.5rem",
            "container-margin": "1.5rem",
            "stack-md": "1rem",
            "gutter": "1rem"
        },
        "fontFamily": {
            "body-lg": ["Inter"],
            "body-sm": ["Inter"],
            "label-sm": ["Inter"],
            "headline-lg": ["Plus Jakarta Sans"],
            "headline-sm": ["Plus Jakarta Sans"],
            "headline-md": ["Plus Jakarta Sans"],
            "label-md": ["Inter"],
            "body-md": ["Inter"]
        },
        "fontSize": {
            "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }],
            "body-sm": ["14px", { "lineHeight": "20px", "fontWeight": "400" }],
            "label-sm": ["12px", { "lineHeight": "14px", "fontWeight": "500" }],
            "headline-lg": ["32px", { "lineHeight": "40px", "letterSpacing": "-0.02em", "fontWeight": "700" }],
            "headline-sm": ["20px", { "lineHeight": "28px", "fontWeight": "600" }],
            "headline-md": ["24px", { "lineHeight": "32px", "fontWeight": "600" }],
            "label-md": ["14px", { "lineHeight": "16px", "fontWeight": "600" }],
            "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }]
        }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
}
