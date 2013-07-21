# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'gepsens_ng_utils/version'

Gem::Specification.new do |spec|
  spec.name          = "gepsens_ng_utils"
  spec.version       = GepsensNgUtils::VERSION
  spec.authors       = ["Guillaume Balaine"]
  spec.email         = ["igosuki@gmail.com"]
  spec.description   = %q{Assets for gepsens apps}
  spec.summary       = %q{Just pulling common files}
  spec.homepage      = ""
  spec.license       = "MIT"

  spec.files         = `git ls-files`.split($/)
  spec.executables   = spec.files.grep(%r{^bin/}) { |f| File.basename(f) }
  spec.test_files    = spec.files.grep(%r{^(test|spec|features)/})
  spec.require_paths = ["lib"]

  spec.add_development_dependency "bundler", "~> 1.3"
  spec.add_development_dependency "rake"
end
