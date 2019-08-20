using System;
using System.Collections.Generic;
using System.Text;
using ComicHero.Core.SharedKernel;

namespace ComicHero.Core.Entities
{
    public class Comic: BaseEntity
    {
        public string Title { get; set; }
        public int IssueNumber { get; set; }
        public string Series { get; set; }
        public string Description { get; set; }
        public string Publisher { get; set; }
        public int Year { get; set; }
        public byte[] Image { get; set; }
    }
}
