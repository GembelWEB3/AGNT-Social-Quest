// 📁 File: agnthubAutomation.js

import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// Cek token
const privyIdToken = process.env.PRIVY_ID_TOKEN;
const privyToken = process.env.PRIVY_TOKEN;

if (!privyIdToken || !privyToken) {
  console.error("❌ Missing PRIVY_ID_TOKEN or PRIVY_TOKEN in .env file");
  process.exit(1);
}

// Header untuk request
const headers = {
  cookie: `privy-id-token=${privyIdToken}; privy-token=${privyToken}`,
  origin: 'https://quests.agnthub.ai',
  referer: 'https://quests.agnthub.ai/',
  'user-agent': 'Mozilla/5.0'
};

// Fungsi delay
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

function getRandomDelay(min = 5, max = 15) {
  const ms = Math.floor(Math.random() * (max - min + 1) + min) * 1000;
  return ms;
}

// ✅ Step 1: Check-in harian
const performCheckin = async () => {
  console.log("🚀 Melakukan daily check-in...");
  try {
    const res = await axios.post('https://hub-api.agnthub.ai/api/daily-rewards/claim', {}, { headers });
    console.log("✅ Daily Check-In Successful:", res.data);
  } catch (err) {
    if (err.response) {
      console.error("❌ Check-in failed:", err.response.status, err.response.data);
    } else {
      console.error("❌ Request error:", err.message);
    }
  }
};

// ✅ Step 2: Ambil poin user
const getUserPoints = async () => {
  try {
    const res = await axios.get('https://hub-api.agnthub.ai/api/users', { headers });
    return res.data?.points || 0;
  } catch (err) {
    console.error("❌ Gagal ambil user info:", err.response?.data || err.message);
    return 0;
  }
};

// ✅ Step 3: Jalankan SOCIAL tasks
const runSocialTasks = async () => {
  let round = 1;

  while (true) {
    console.log(`\n🔁 Round ${round} – Fetching SOCIAL tasks...`);

    let socialTasks = [];

    try {
      const res = await axios.get('https://hub-api.agnthub.ai/api/tasks/my', { headers });
      const available = res.data?.available || [];
      socialTasks = available.filter(task => task.type === 'SOCIAL');
    } catch (err) {
      console.error("❌ Gagal ambil task:", err.response?.data || err.message);
      break;
    }

    if (socialTasks.length === 0) {
      console.log("✅ Tidak ada SOCIAL task tersisa. Loop selesai.");
      break;
    }

    console.log(`🧩 Menjalankan ${socialTasks.length} SOCIAL task...\n`);

    for (const task of socialTasks) {
      try {
        await axios.post(
          `https://hub-api.agnthub.ai/api/tasks/start/${task.id}`,
          {},
          { headers }
        );
        console.log(`✅ Started: ${task.title}`);
        console.log(`   🆔 ID     : ${task.id}`);
        console.log(`   🎁 Reward : ${task.rewardPointsAmount} points`);
        console.log(`   🔗 URL    : ${task.redirectUrl}`);
        await delay(2000);
      } catch (err) {
        console.error(`❌ Gagal start: ${task.title} (${task.id})`);
        console.error(err.response?.data || err.message);
      }
    }

    const points = await getUserPoints();
    console.log(`\n⭐ Total Points Sekarang: ${points} pts`);

    const delayMs = getRandomDelay();
    console.log(`\n⏳ Menunggu ${delayMs / 1000} detik sebelum round selanjutnya...\n${'-'.repeat(50)}`);
    await delay(delayMs);
    round++;
  }
};

// ✅ Eksekusi utama
const main = async () => {
  await performCheckin();
  await runSocialTasks();
};

main();
