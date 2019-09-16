using ElementUIApp.Common;
using ElementUIApp.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;

namespace ElementUIApp.Controllers.Api
{
    public class ServeController : ApiController
    {
        string GetWebApiUrl = "http://192.168.2.42:7016/api/Product/GetProduct";
        //public HttpResponseMessage GetSignature(string timeStamp, string nonce, string staffId, string signToken, string data)
        //{
        //    string result = WebApiHelper.GetSignature(timeStamp, nonce, staffId, signToken, data);
        //    return new HttpResponseMessage { Content = new StringContent(result, Encoding.GetEncoding("UTF-8"), "application/json") };
        //}

        [HttpPost]
        public HttpResponseMessage GetProduct([FromBody]QueryOptions queryOptions)
        {
            Dictionary<string,string> dicParams = new Dictionary<string,string>();
            if (null != queryOptions.Items) {
                foreach (var item in queryOptions.Items)
                {
                    dicParams.Add(item.Key, item.Value);
                }
            }

            Tuple<string, string> parameters = WebApiHelper.GetQueryString(dicParams);
            var product = WebApiHelper.Get<ProductResultMsg>(GetWebApiUrl, parameters.Item1, parameters.Item2, "A09");

            return new HttpResponseMessage { Content = new StringContent(JsonConvert.SerializeObject(product), Encoding.GetEncoding("UTF-8"), "application/json") };
        }
    }
}
