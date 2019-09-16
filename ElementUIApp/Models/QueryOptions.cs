using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ElementUIApp.Models
{
    public class QueryOptions
    {
        [JsonProperty(PropertyName = "method")]
        public string Method { get; set; }

        [JsonProperty(PropertyName = "timestamp")]
        public string TimeStamp { get; set; }

        [JsonProperty(PropertyName = "nonce")]
        public string NOnce { get; set; }

        [JsonProperty(PropertyName = "staffid")]
        public string StaffId { get; set; }

        [JsonProperty(PropertyName = "signtoken")]
        public string SignToken { get; set; }

        [JsonProperty(PropertyName = "items")]
        public List<QueryOptionsItems> Items { get; set; }
        
    }

    public class QueryOptionsItems {
        [JsonProperty(PropertyName = "key")]
        public string Key { get; set; }

        [JsonProperty(PropertyName = "value")]
        public string Value { get; set; }
    }
}