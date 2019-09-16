using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ElementUIApp.ViewModels
{
    public class UserViewModel
    {
        [JsonProperty(PropertyName = "id")]
        public string ID { get; set; }

        [JsonProperty(PropertyName = "date")]
        public string DATE { get; set; }

        [JsonProperty(PropertyName = "name")]
        public string NAME { get; set; }

        [JsonProperty(PropertyName = "address")]
        public string ADDRESS { get; set; }

        [JsonProperty(PropertyName = "province")]
        public string PROVINCE { get; set; }

        [JsonProperty(PropertyName = "city")]
        public string CITY { get; set; }

    }
}