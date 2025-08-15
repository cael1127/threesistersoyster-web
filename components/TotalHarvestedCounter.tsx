

export default function TotalHarvestedCounter() {
  // Easy to update number - just change this value when you want to update the counter
  const totalHarvested = "Coming Soon";

  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-bold text-purple-900 mb-2">
        {totalHarvested}
      </div>
      <p className="text-sm md:text-base text-purple-800">Total Harvested</p>
    </div>
  );
} 