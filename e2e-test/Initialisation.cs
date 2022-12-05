using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace e2e_test
{
    public static class Initialisation
    {
        [ModuleInitializer]
        public static void Run() => VerifyPlaywright.Enable();
    }
}
