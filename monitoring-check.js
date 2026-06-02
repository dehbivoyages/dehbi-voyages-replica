/**
 * Script de surveillance automatique quotidienne
 * Vérifie l'affichage des programmes du site Dehbi Voyages
 * À exécuter via une tâche planifiée (cron ou scheduler)
 */

const fs = require('fs');
const path = require('path');

// Configuration
const SITE_URL = 'https://dehbivoyage-vixffkrc.manus.space';
const LOG_FILE = path.join(__dirname, 'monitoring-log.txt');
const CHECK_INTERVAL = 24 * 60 * 60 * 1000; // 24 heures

// Programmes à surveiller
const PROGRAMS = [
  {
    id: 1,
    name: 'Voyage Organisé - Arabie Saoudite',
    videoUrl: '/manus-storage/video_voyage_arabie_saoudite_24d26664.mp4',
  },
  {
    id: 2,
    name: 'Voyage Organisé - Chine Éternelle',
    videoUrl: '/manus-storage/video_voyage_chine_3c3f30f4.mp4',
  },
  {
    id: 3,
    name: 'Voyage Organisé - Thaïlande Jungle & Plages De Rêve',
    videoUrl: '/manus-storage/video_voyage_thailande_jungle_5fc86a5e.mp4',
  },
  {
    id: 4,
    name: 'Voyage Organisé - Thaïlande Rêvée',
    videoUrl: '/manus-storage/video_voyage_thailande_revee_8a932689.mp4',
  },
  {
    id: 5,
    name: 'Voyage Organisé - Istanbul Mai 2026',
    videoUrl: '/manus-storage/video_voyage_istanbul_dc42ff93.mp4',
  },
  {
    id: 6,
    name: 'Voyages Spirituels - Omra Complète',
    videoUrl: '/manus-storage/spiritual_omra_video.mp4',
  },
  {
    id: 7,
    name: 'Voyages Spirituels - Visite Médinas Sacrées',
    videoUrl: '/manus-storage/spiritual_medinas_video.mp4',
  },
  {
    id: 8,
    name: 'Voyages Spirituels - Retraite Spirituelle',
    videoUrl: '/manus-storage/spiritual_retreat_video.mp4',
  },
  {
    id: 9,
    name: 'Services Premium - Circuits Touristiques',
    videoUrl: '/manus-storage/morocco_circuits_slideshow_5c40b722.mp4',
  },
];

/**
 * Fonction de log
 */
function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  console.log(logMessage);
  fs.appendFileSync(LOG_FILE, logMessage);
}

/**
 * Vérifier l'affichage d'un programme
 */
async function checkProgram(program) {
  try {
    const response = await fetch(`${SITE_URL}${program.videoUrl}`, {
      method: 'HEAD',
      timeout: 5000,
    });

    if (response.ok) {
      log(`✅ ${program.name} - OK (${response.status})`);
      return true;
    } else {
      log(`⚠️  ${program.name} - ERREUR (${response.status})`);
      return false;
    }
  } catch (error) {
    log(`❌ ${program.name} - ERREUR: ${error.message}`);
    return false;
  }
}

/**
 * Exécuter la surveillance
 */
async function runMonitoring() {
  log('='.repeat(60));
  log('SURVEILLANCE AUTOMATIQUE - DÉBUT');
  log(`Total de programmes à vérifier: ${PROGRAMS.length}`);
  log('='.repeat(60));

  let successCount = 0;
  let errorCount = 0;

  for (const program of PROGRAMS) {
    const isOk = await checkProgram(program);
    if (isOk) {
      successCount++;
    } else {
      errorCount++;
    }
    // Délai entre les vérifications
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  log('='.repeat(60));
  log(`RÉSUMÉ: ${successCount}/${PROGRAMS.length} programmes OK`);
  if (errorCount > 0) {
    log(`⚠️  ${errorCount} programme(s) en erreur`);
  }
  log('='.repeat(60));
  log('');
}

/**
 * Planifier la surveillance quotidienne
 */
function scheduleMonitoring() {
  log('Surveillance automatique planifiée - Vérification quotidienne activée');
  
  // Première vérification immédiate
  runMonitoring();
  
  // Vérification quotidienne à 02:00 AM
  setInterval(() => {
    runMonitoring();
  }, CHECK_INTERVAL);
}

// Démarrer la surveillance
if (require.main === module) {
  scheduleMonitoring();
}

module.exports = { runMonitoring, scheduleMonitoring };
