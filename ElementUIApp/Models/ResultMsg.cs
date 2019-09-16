using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ElementUIApp.Models
{
    public class ResultMsg
    {

        [JsonProperty(PropertyName = "statusCode")]
        public string StatusCode { get; set; }


        [JsonProperty(PropertyName = "info")]
        public string Info { get; set; }

        [JsonProperty(PropertyName = "data")]
        public string Data { get; set; }
    }
}