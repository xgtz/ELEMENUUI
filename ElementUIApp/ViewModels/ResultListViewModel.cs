using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ElementUIApp.ViewModels
{
    public class ResultListViewModel<T>
    {
        public ResultListViewModel(List<T> results,int total)
        {
            this.Total = total;
            this.Rows = results;
        }

        [JsonProperty(PropertyName = "total")]
        public int Total { get; set; }

        [JsonProperty(PropertyName = "rows")]
        public List<T> Rows { get; set; }
    }
}