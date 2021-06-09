namespace :start do
    task :production do
        exec 'SET NPM_CONFIG_PRODUCTION=true npm run postinstall && foreman start'
    end
end