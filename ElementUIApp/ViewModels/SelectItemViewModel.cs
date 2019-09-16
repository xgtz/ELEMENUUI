using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ElementUIApp.ViewModels
{
    public class SelectItemViewModel
    {
         [JsonProperty(PropertyName = "label")]
        public string Label{get;set;}
        
         [JsonProperty(PropertyName = "value")]
        public string Value{get;set;}
    }
}