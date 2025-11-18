require('dotenv').config()

const { connectDB, disconnectDB } = require('../models/mongodb/config.js')
const { aspirantes_model } = require('../models/mongodb/aspirantes.js')

async function main() {
  const args = process.argv.slice(2)
  // Simple arg parsing: --nombre --apellidos --correo --telefono --carrera
  const argMap = {}
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i]
    const val = args[i + 1]
    if (key && key.startsWith('--')) argMap[key.slice(2)] = val
  }

  const ts = Date.now()
  const payload = {
    Nombre: argMap.nombre || 'Aspirante Demo',
    Apellidos: argMap.apellidos || 'Prueba',
    Correo: argMap.correo || `aspirante.demo.${ts}@example.com`,
    Telefono: argMap.telefono || '',
    CarreraSlug: argMap.carrera || ''
  }

  try {
    await connectDB()
    const result = await aspirantes_model.createPreRegistro(payload)
    if (result.status === 201) {
      const out = {
        status: 201,
        message: 'Pre-registro creado',
        preficha: result.data.aspirante.Preficha,
        uuid: result.data.aspirante.UUID,
        username: result.data.credentials.username,
        password: result.data.credentials.password,
        correo: result.data.aspirante.Correo
      }
      console.log(JSON.stringify(out, null, 2))
    } else {
      console.error('Error:', result)
      process.exitCode = 1
    }
  } catch (e) {
    console.error('Exception:', e)
    process.exitCode = 1
  } finally {
    try { await disconnectDB() } catch (_) {}
  }
}

main()
