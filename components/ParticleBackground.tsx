"use client";

import { useEffect } from "react";

export default function ParticleBackground() {
  useEffect(() => {
    const container = document.getElementById("particles");
    if (!container) return;

    // Clear existing particles
    container.innerHTML = "";

    // Create particles
    for (let i = 0; i < 25; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDuration = `${Math.random() * 15 + 15}s`;
      particle.style.animationDelay = `${Math.random() * 15}s`;
      particle.style.opacity = `${Math.random() * 0.5 + 0.2}`;
      container.appendChild(particle);
    }

    return () => {
      container.innerHTML = "";
    };
  }, []);

  return null;
}
