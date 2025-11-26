import { useState, useEffect } from "react";

interface StreakData {
  current: number;
  lastActivity: string; // ISO date string
  longest: number;
}

export function useStreak() {
  const [streak, setStreak] = useState<StreakData>({
    current: 0,
    lastActivity: "",
    longest: 0,
  });

  // Load streak from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("serilist_streak");
    if (saved) {
      const data: StreakData = JSON.parse(saved);
      // Check if streak is broken
      const today = new Date().toDateString();
      const lastDate = new Date(data.lastActivity).toDateString();
      const yesterday = new Date(Date.now() - 86400000).toDateString();

      if (lastDate === today) {
        // Already updated today
        setStreak(data);
      } else if (lastDate === yesterday) {
        // Streak continues
        setStreak(data);
      } else {
        // Streak broken!
        setStreak({ ...data, current: 0 });
        localStorage.setItem(
          "serilist_streak",
          JSON.stringify({ ...data, current: 0 })
        );
      }
    }
  }, []);

  // Record activity (call this when user adds/edits series)
  const recordActivity = () => {
    const today = new Date().toDateString();
    const lastDate = new Date(streak.lastActivity).toDateString();

    if (lastDate === today) {
      // Already counted today, do nothing
      return;
    }

    const newCurrent = streak.current + 1;
    const newLongest = Math.max(newCurrent, streak.longest);

    const updated: StreakData = {
      current: newCurrent,
      lastActivity: new Date().toISOString(),
      longest: newLongest,
    };

    setStreak(updated);
    localStorage.setItem("serilist_streak", JSON.stringify(updated));
  };

  return { streak, recordActivity };
}
