import { env } from './infra/env'
import { app } from './infra/http/app'

app.listen(env.SERVER_PORT, () =>
  console.log(`🔥🚀 HTTP Server running at localhost:${env.SERVER_PORT}`),
)
