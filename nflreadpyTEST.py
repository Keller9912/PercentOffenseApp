import nflreadpy as nfl
import pandas as pd

print("Loading NFL data...\n")

# 1. Load current season play-by-play data
print("1. Loading Play-by-Play data...")
pbp = nfl.load_pbp()
print(f"   ✓ Loaded {len(pbp)} play-by-play records")


# 2. Load snap counts
print("2. Loading Snap Counts...")
snap_counts = nfl.load_snap_counts()
print(f"   ✓ Loaded {len(snap_counts)} snap count records")


# 3. Load player stats (weekly stats)
print("3. Loading Player Stats (Weekly)...")
player_stats = nfl.load_player_stats()
print(f"   ✓ Loaded {len(player_stats)} player stat records")


# 4. Load players/rosters data
print("4. Loading Player/Roster Data...")
players = nfl.load_rosters()
print(f"   ✓ Loaded {len(players)} player records")


# ============================================================================
# DISPLAY SAMPLE DATA
# ============================================================================

print("="*80)
print("SAMPLE DATA PREVIEW")
print("="*80)

print("\n📊 PLAY-BY-PLAY (First 3 rows):")
print(pbp.head(3))

print("\n\n📈 SNAP COUNTS (First 5 rows):")
print(snap_counts.head(5))

print("\n\n🏈 PLAYER STATS (First 5 rows):")
print(player_stats.head(5))

print("\n\n👤 PLAYERS/ROSTERS (First 5 rows):")
print(players.head(5))