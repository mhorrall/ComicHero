using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ComicHero.Web.ApiModels;
using FluentValidation;

namespace ComicHero.Web.Validation
{
    public class ComicValidator:AbstractValidator<ComicDto>
    {
        public ComicValidator()
        {
            RuleFor(c => c.Title).NotEmpty();
            RuleFor(c => c.IssueNumber).NotEmpty();
            RuleFor(c => c.Series).NotEmpty();
            RuleFor(c => c.Description).NotEmpty();
            RuleFor(c => c.Publisher).NotEmpty();
            RuleFor(c => c.Year).NotEmpty();
        }
    }
}
