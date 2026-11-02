# CLAUDE.md — Wakanze Public Gateway

Contexto para o Claude Code. Lê isto antes de qualquer alteração.

## Projeto
Primeiro módulo da plataforma Wakanze: o **Public Gateway**, a entrada pública que transforma
um visitante numa pessoa conhecida e contactável.
Ciclo a provar: Redes sociais → site → conteúdo/eventos → captura de email → interesse → (futuro) membership.

- Dono / decisor: o Admin (Slack, workspace `wakanze`, canal `#technology`).
- Developer: Rómulo Físico (Dev). Responde em **português**.

## Documentos (fonte de verdade) — `docs/architecture/`
Se discordarem, ganha o de cima:
1. `Wakanze - Final Technical Baseline Review v0.1` — construir a partir das §8–14
2. `6. Implementation Readiness Report v0.1`
3. `5. Digital Platform Architecture v0.1` (§5, §9 e §32 são as mais importantes)
4. `2. Public Gateway MVP - SRS v0.2` — **a checklist: se não está no SRS, não se constrói**
5. `3. MVP Decision Record v0.1` (D1–D5, fechadas: não reabrir sem nova decisão registada)
6. `4. Development & Institutional Roadmap v0.1`
7. `1. Domain_Map_v02` — regras conceptuais; validar cada tabela, campo ou permissão nova contra ele
8. `7. Master Vision & Architecture v0.1`, `Vision` — só contexto

Decisões técnicas: `docs/adrs/` (ADR-001..017). Fases: `docs/PHASES.md`.

## Repositório e pasta de trabalho
- Repo: `github.com/Wakanze/Wakanze-platform`. **O projeto do Admin (raiz, `frontend/`) é a base e não se altera.**
- Todo o nosso trabalho vive em **`romulo-fisico/`**, para o Admin avaliar. Nada fora desta pasta muda.
- Metodologia do Admin: branch `feat/...`, commits curtos no imperativo ("Add …"), PR para ele rever.
- O frontend segue a stack e as convenções do `frontend/` dele: imports relativos com extensão
  (`./x.tsx`), `export default` nos componentes, sem ponto e vírgula, aspas simples, Tailwind inline.

## Stack
Monólito modular · Django 5.2 + DRF · PostgreSQL 16 · Docker sem Kubernetes ·
sessão Django + CSRF (sem JWT) · REST em `/api/v1/`.
Frontend: React 19 + TypeScript, Vite 8, Tailwind CSS 4, react-router 7, i18next (EN/PT/FR/ES), Vitest.
Sem microserviços, GraphQL, Celery/Redis ou Kubernetes sem requisito demonstrado.

## Regras que não se podem quebrar
- **Platform Access ≠ autoridade institucional.** Admin/Editor são permissões de software (ADR-007).
  Não criar tabelas ou campos de Membership, Stage, Role institucional, Governance Seat,
  Institutional Authority ou Institutional Records no MVP. A decisão A-02 continua em aberto: não tocar.
- **Person ≠ Lead ≠ Interest ≠ Account** (ADR-011). Sem campo `user_type`. Person não tem email.
  "Uma Person por email" é regra de serviço com unicidade em `Lead.email` (ADR-017), e é uma
  restrição técnica do MVP, não um princípio institucional.
- **Acesso vem só do `StaffRole`** (ativo = `ended_at IS NULL`). Nunca usar `is_staff`/`is_superuser`.
  Permission classes: `IsAuthenticatedStaff`, `IsAdminRole`, `IsEditorOrAdminRole` (`apps/core/permissions.py`).
  Export de PII (leads, interests) só para `IsAdminRole`.
- **Auditar todas as ações de staff que alteram dados** com `apps.audit.services.record()`.
  Mudanças de papel só via `apps.accounts.services` (`grant_role` / `revoke_role`).
  `AuditLog` é append-only. `NewsletterApproval` (Fase 3) é tabela própria porque bloqueia o envio.
- **Com `ATOMIC_REQUESTS=True`, uma exceção desfaz o audit escrito no mesmo pedido.**
  Para falhas que devem ficar auditadas, devolver a `Response` de erro em vez de fazer `raise`.
- **Sem textos de UI no código.** Chaves em `frontend/src/i18n/locales/` nos 4 ficheiros
  (`en`, `pt`, `fr`, `es`; um teste garante que têm as mesmas chaves). No backend, usar `gettext`.
- **Fornecedores atrás de interfaces**: EmailProvider, DraftingProvider, StorageProvider (ADR-008..010).
  IA e email são camadas separadas. Analytics não é abstraído.
- **Endpoints públicos de escrita** (`POST /leads/`, `/interests/`): com rate limit (ADR-016) e a devolver
  só uma confirmação mínima, nunca o registo guardado.
- **Formato de erro da API**: `{"error": {"code", "message", "details"}}` (`apps/core/exceptions.py`).
- **Migrações** são um passo de release explícito, nunca correm no arranque.
- **Princípio de governação**: a IA ajuda, um humano responsável aprova comunicações relevantes
  (newsletter: Draft → Review → Approval → Send → Audit, com quem aprovou e quando).
- **Operações manuais são aceitáveis.** Não automatizar o que o SRS não exige.
- Referenciar IDs de requisito (WEB-1, LEAD-4, MEM-2…) nos commits e nos testes.

## Estrutura
- `backend/apps/`: `core`, `identity` (Person), `accounts` (Account, StaffRole), `content`, `events`,
  `leads`, `interests`, `newsletter`, `analytics`, `audit` — as 10 apps do Final Review §9.
  As apps `content` a `analytics` estão vazias até chegar a fase delas.
- `backend/config/settings/`: `base`, `dev`, `test`, `prod`; configuração por variáveis de ambiente.
- `frontend/src/`: `app/`, `pages/public/`, `pages/admin/` (só NewsletterApproval e AnalyticsDashboard;
  o resto é feito na Django Admin), `features/`, `components/`, `api/` (cliente fetch com CSRF), `i18n/`, `lib/`.
- O Vite faz proxy de `/api`, `/admin` e `/static` para o Django, para tudo ficar na mesma origem.

## Comandos (a partir de `romulo-fisico/`)
```bash
# stack completa
docker compose up --build -d
docker compose exec backend python manage.py migrate
docker compose exec backend python manage.py create_staff_account --email x@y.z --role admin

# verificações (as mesmas da CI) — correr antes de dar trabalho por terminado
cd backend  && ruff check . && ruff format --check . && python manage.py makemigrations --check --dry-run && pytest
cd frontend && npm run lint && npm run typecheck && npm test && npm run build
```

## Estado (atualizar ao fechar cada fase)
- **Fase 1, fundação técnica: concluída** e trazida para `romulo-fisico/` (2026-11-02), com o frontend
  refeito na stack do Admin. 28 testes no backend e 7 no frontend, todos a passar.
  Nesta máquina **não há Python no host**: correr os checks do backend com `docker compose exec backend ...`.
- **A seguir: o mockup / UX** do Public Gateway, nesta pasta, com a stack do Admin.
- CI: `.github/workflows/ci.yml` fica nesta pasta e **não corre** (o GitHub só lê a raiz). Ativar só se o Admin quiser.

Respostas do Admin (Slack, 2026-10-29 e conversa de 2026-11-02):
1. Repositório: `github.com/Wakanze/Wakanze-platform` (público). O GitHub é a base do projeto.
2. Hosting: sem preferência ("pode ser Azure, etc.").
3. Aprovador da newsletter (D5): o próprio Admin, por agora; no futuro será outra pessoa.
4. Design: não há identidade visual. O Dev assume o design.
5. Os documentos ficam numa pasta própria no repo (`docs/architecture/`, incluindo os `.docx`).

Tarefas pedidas pelo Admin: **(1) melhorar e organizar a documentação** e **(2) criar a UX (mockup)**,
com a stack e as metodologias dele, para ele avaliar a qualidade do trabalho.

Fornecedores ainda não escolhidos (Categoria B): email, IA, storage, hosting, CDN, monitorização.
Implementar as interfaces primeiro; os adaptadores concretos vêm depois.
