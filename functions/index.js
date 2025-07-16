const functions = require("firebase-functions");
const admin = require("firebase-admin");
const dayjs = require("dayjs");

admin.initializeApp();
const db = admin.firestore();

exports.deleteExpiredAppointments = functions.pubsub
  .schedule("every 1 hours") // roda a cada 1 hora
  .timeZone("America/Sao_Paulo")
  .onRun(async () => {
    const now = dayjs();

    const snapshot = await db.collection("appointments").get();
    const batch = db.batch();

    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const timeStart = data.time?.split(" - ")[0]; // exemplo: "08:30"
      const appointmentDateTime = dayjs(`${data.date} ${timeStart}`, "YYYY-MM-DD HH:mm");

      if (appointmentDateTime.isBefore(now)) {
        batch.delete(docSnap.ref);
      }
    });

    await batch.commit();

    console.log("✅ Agendamentos vencidos removidos automaticamente.");
    return null;
  });
