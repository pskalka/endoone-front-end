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
      target: "https://localhost",
      secure: false,
      logLevel: "debug"
   }
]

module.exports = PROXY_CONFIG;