"use client";
import {
  HarvestReadyInventoryCounter,
  FarmInventoryCounter,
  NurseryInventoryCounter,
} from "./inventory-counters";

export default function ClientInventoryCounters() {
  return (
    <>
      <HarvestReadyInventoryCounter />
      <FarmInventoryCounter />
      <NurseryInventoryCounter />
    </>
  );
} 