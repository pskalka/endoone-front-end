const PROXY_CONFIG = [
   {
      context: [
         "/bin",
         "/configuration",
         "/content",
         "/next-forms",
         "/j_security_check",
         "/system",
         "/endoone/machinename"
      ],
      target: "http://localhost:8080",
      secure: false,
      logLevel: "debug"
   }
]

module.exports = PROXY_CONFIG;