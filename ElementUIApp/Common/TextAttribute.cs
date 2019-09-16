using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ElementUIApp.Common
{
    class TextAttribute : Attribute
    {
        public TextAttribute(string value)
        {
            Value = value;
        }

        public string Value { get; set; }
    }
}