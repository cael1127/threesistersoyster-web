

export default function TotalHarvestedCounter() {
  // Easy to update number - just change this value when you want to update the counter
  const totalHarvested = 12500;

  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-bold text-white mb-2">
        {totalHarvested.toLocaleString()}
      </div>
      <p className="text-sm md:text-base text-white">Total Harvested</p>
    </div>
  );
} 