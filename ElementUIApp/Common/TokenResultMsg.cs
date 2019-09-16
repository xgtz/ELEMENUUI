﻿using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ElementUIApp.Common
{
    public class TokenResultMsg : HttpResponseMsg
    {
        public Token Result
        {
            get
            {
                if (StatusCode == (int)StatusCodeEnum.Success)
                {
                    return JsonConvert.DeserializeObject<Token>(Data.ToString());
                }

                return null;
            }
        }
    }
}